export default function Template(content) {
  return `
  <!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Rezepte</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  ${content}
</body>
</html>
`;
}

