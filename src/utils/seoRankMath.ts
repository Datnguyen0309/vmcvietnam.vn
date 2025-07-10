export const replaceSeoRM = (input: string) => {
  input = input.replace(
    `link rel="canonical" href="http://10.10.51.16:8686/`,
    `link rel="canonical" href="https://ome.edu.vn`
  );

  input = input.replace(
    `meta property="og:url" content="http://10.10.51.16:8686/`,
    `meta property="og:url" content="https://ome.edu.vn`
  );

  input = input.replace(
    `"@id":"http://10.10.51.16:8686/#organization"`,
    `"@id":"https://ome.edu.vn/#organization"`
  );

  input = input.replace(
    `http://10.10.51.16:8686/#logo`,
    `https://ome.edu.vn/#logo`
  );

  input = input.replace(
    `http://10.10.51.16:8686/#website`,
    `https://ome.edu.vn/#website`
  );
  input = input.replace(
    `http://10.10.51.16:8686/#webpage`,
    `https://ome.edu.vn/#webpage`
  );
  input = input.replace(
    `"url":"http://10.10.51.16:8686/"`,
    `"url":"https://ome.edu.vn"`
  );

  input = input.replace(
    `"@type":"WebPage","@id":"http://10.10.51.16:8686/`,
    `"@type":"WebPage","@id":"https://ome.edu.vn`
  );

  input = input.replace(
    `#webpage","url":"http://10.10.51.16:8686/`,
    `#webpage","url":"https://ome.edu.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"http://10.10.51.16:8686/`,
    `"mainEntityOfPage":{"@id":"https://ome.edu.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"http://10.10.51.16:8686/#organization`,
    `"worksFor":{"@id":"https://ome.edu.vn/#organization`
  );

  input = input.replace(
    `"sameAs":["http://10.10.51.16:8686/"]`,
    `"sameAs":["https://ome.edu.vn"]`
  );
  input = input.replace("noindex", "index");
  input = input.replace("nofollow", "follow");
  return input;
};
