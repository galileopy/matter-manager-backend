# Define variables

$directoryA = "C:\GenMatter\matter-manager-backend"
$directoryB = "C:\GenMatter\matter-manager-frontend"

$sitePathA = "C:\GenMatter\matter-manager-backend\dist"
$proxyDestinationA = "http://localhost:3000"

 

# Function to perform git pull and npm build

function GitPullAndNpmBuild {

    param (
        [string]$directory
    )

    Write-Host "Processing directory: $directory"
    Set-Location -Path $directory

    try {
        git pull
        if ($LASTEXITCODE -ne 0) {
            throw "Git pull failed in directory $directory"
        }
    } catch {
        Write-Host "Error: $($_.Exception.Message)"
        return
    }

    npm install

    try {
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "npm run build failed in directory $directory"
        }
    } catch {
        Write-Host "Error: $($_.Exception.Message)"
        return
    }

}

 
# Function to create a proxy using URL Rewrite in IIS

function CreateProxy {
    param (
        [string]$sitePath,
        [string]$proxyDestination
    )

    Write-Host "Creating proxy for site path: $sitePath"

    # Create web.config with URL Rewrite rules
    $webConfigPath = "$sitePath\web.config"

    # Define URL Rewrite rules
    $rewriteRules = @"

<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name='ReverseProxyInboundRule' stopProcessing='true'>
                    <match url='(.*)' />
                    <action type='Rewrite' url='$proxyDestination/{R:1}' />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
"@

    try {
        # Create or overwrite web.config
        $rewriteRules | Out-File -FilePath $webConfigPath -Encoding UTF8
        Write-Host "web.config created at $webConfigPath"
    } catch {
        Write-Host "Error writing web.config: $($_.Exception.Message)"
        return
    }

    try {
        # Restart the IIS site to apply changes
        Restart-WebAppPool -Name GenMatter
        iisreset
        Write-Host "IIS reset successfully."
    } catch {
        Write-Host "Error restarting IIS: $($_.Exception.Message)"
    }

}


# Main script execution
# Step 1: Git pull and npm build for directory A
GitPullAndNpmBuild -directory $directoryA

# Step 2: Git pull and npm build for directory B
GitPullAndNpmBuild -directory $directoryB

# Step 3: Create proxy for Site A
CreateProxy -sitePath $sitePathA -proxyDestination $proxyDestinationA
Write-Host "Script execution completed."