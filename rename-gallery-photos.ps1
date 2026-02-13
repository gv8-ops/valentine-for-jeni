# Rename Gallery Photos Script
# This renames image1-26 to photo1-26 and standardizes to .jpg extension

$galleryPath = "assets\images\gallery"

# Get all image files and sort them
$files = Get-ChildItem -Path $galleryPath -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' } | Sort-Object Name

$counter = 1

foreach ($file in $files) {
    $newName = "photo$counter.jpg"
    $newPath = Join-Path $galleryPath $newName
    
    # Rename the file
    Rename-Item -Path $file.FullName -NewName $newName -Force
    
    Write-Host "Renamed: $($file.Name) -> $newName"
    $counter++
}

Write-Host "`nDone! Renamed $($counter - 1) files."
Write-Host "All photos are now: photo1.jpg, photo2.jpg, etc."
