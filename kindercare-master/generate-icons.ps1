# Script untuk generate PWA icons dari logo.png
$logoPath = "public/image/logo.png"
$iconDir = "public/icon"

# Sizes yang dibutuhkan untuk PWA
$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)

Write-Host "Generating PWA icons from logo.png..."

# Cek apakah logo.png ada
if (Test-Path $logoPath) {
    Write-Host "Logo found at $logoPath"
    
    # Untuk sementara, buat placeholder icons menggunakan logo yang ada
    foreach ($size in $sizes) {
        $outputPath = "$iconDir/icon-${size}x${size}.png"
        Write-Host "Would generate: $outputPath (${size}x${size})"
        
        # Copy logo sebagai placeholder (dalam production, gunakan image resizing tool)
        Copy-Item $logoPath $outputPath -Force
    }
    
    Write-Host "PWA icons generated successfully!"
    Write-Host "Note: In production, use proper image resizing tools to create different sizes."
} else {
    Write-Host "Logo not found at $logoPath"
    Write-Host "Creating placeholder icons..."
    
    # Jika logo tidak ada, beri instruksi manual
    foreach ($size in $sizes) {
        $outputPath = "$iconDir/icon-${size}x${size}.png"
        Write-Host "Please create: $outputPath (${size}x${size})"
    }
}

Write-Host "Done!"
