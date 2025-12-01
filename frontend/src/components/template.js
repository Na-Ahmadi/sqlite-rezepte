export default function Template({title, content}) {
  return /* html */ `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}
