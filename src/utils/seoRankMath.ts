export const replaceSeoRM = (input: string) => {
  input = input.replace(
    `link rel="canonical" href="http://admin.ome.edu.vn`,
    `link rel="canonical" href="https://ome.edu.vn`
  );
  
  input = input.replace(
    `meta property="og:url" content="http://admin.ome.edu.vn`,
    `meta property="og:url" content="https://ome.edu.vn`
  );

  input = input.replace(
    `"@id":"http://admin.ome.edu.vn/#organization"`,
    `"@id":"https://ome.edu.vn/#organization"`
  );

  input = input.replace(
    `http://admin.ome.edu.vn/#logo`,
    `https://ome.edu.vn/#logo`
  );

  input = input.replace(
    `http://admin.ome.edu.vn/#website`,
    `https://ome.edu.vn/#website`
  );
  input = input.replace(
    `http://admin.ome.edu.vn/#webpage`,
    `https://ome.edu.vn/#webpage`
  );
  input = input.replace(
    `"url":"http://admin.ome.edu.vn"`,
    `"url":"https://ome.edu.vn"`
  );

  input = input.replace(
    `"@type":"WebPage","@id":"http://admin.ome.edu.vn`,
    `"@type":"WebPage","@id":"https://ome.edu.vn`
  );

  input = input.replace(
    `#webpage","url":"http://admin.ome.edu.vn`,
    `#webpage","url":"https://ome.edu.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"http://admin.ome.edu.vn`,
    `"mainEntityOfPage":{"@id":"https://ome.edu.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"http://admin.ome.edu.vn/#organization`,
    `"worksFor":{"@id":"https://ome.edu.vn/#organization`
  );

  input = input.replace(
    `"sameAs":["http://admin.ome.edu.vn"]`,
    `"sameAs":["https://ome.edu.vn"]`
  );
  return input;
};
