$base = 'D:\Claude Code\sar-quebec\contenu-source'
New-Item -ItemType Directory -Force -Path "$base\texte" | Out-Null

function Convert-HtmlToText([string]$html) {
    $m = [regex]::Match($html, '(?is)<main\b[^>]*>(.*?)</main>')
    $body = if ($m.Success) { $m.Groups[1].Value } else { $html }
    $body = [regex]::Replace($body, '(?is)<(script|style|noscript|svg)\b[^>]*>.*?</\1>', ' ')
    $body = [regex]::Replace($body, '(?is)<br\s*/?>', "`n")
    $body = [regex]::Replace($body, '(?is)</(p|div|li|h1|h2|h3|h4|h5|tr|section)>', "`n")
    $body = [regex]::Replace($body, '(?is)<li\b[^>]*>', "- ")
    $body = [regex]::Replace($body, '(?is)<img\b[^>]*?src\s*=\s*"([^"]+)"[^>]*>', "`n[IMAGE: `$1]`n")
    $body = [regex]::Replace($body, '(?is)<a\b[^>]*?href\s*=\s*"([^"]+)"[^>]*>(.*?)</a>', "`$2 <`$1>")
    $body = [regex]::Replace($body, '(?s)<[^>]+>', ' ')
    $body = [System.Net.WebUtility]::HtmlDecode($body)
    $body = [regex]::Replace($body, '[ \t\u00A0]+', ' ')
    $body = [regex]::Replace($body, '(?m)^\s+|\s+$', '')
    $body = [regex]::Replace($body, '(\r?\n){3,}', "`n`n")
    # Retirer le bruit des grilles de produits fantomes du theme Shopify
    $bruit = '^(Titre du produit|Prix d''origine|Prix actuel|Choisir des options|View full details|Voir tous les certificats|Ajouter au panier|\||\| /|-|\$[\d,.]+|Epuise|Épuisé)$'
    $lignes = $body -split "`r?`n" | Where-Object { $_ -notmatch $bruit }
    $body = ($lignes -join "`n")
    $body = [regex]::Replace($body, '(\r?\n){3,}', "`n`n")
    return $body.Trim()
}

foreach ($dir in @('pages', 'blogue')) {
    New-Item -ItemType Directory -Force -Path "$base\texte\$dir" | Out-Null
    Get-ChildItem "$base\$dir" -Filter *.html | ForEach-Object {
        $html = [IO.File]::ReadAllText($_.FullName, [Text.Encoding]::UTF8)
        $txt = Convert-HtmlToText $html
        [IO.File]::WriteAllText("$base\texte\$dir\$($_.BaseName).txt", $txt, [Text.Encoding]::UTF8)
    }
}
Get-ChildItem "$base\texte" -Recurse -File | Sort-Object Length -Descending |
    Select-Object @{n='fichier';e={$_.Directory.Name + '/' + $_.Name}}, @{n='ko';e={[math]::Round($_.Length/1KB,1)}} |
    Format-Table -AutoSize
