export const replaceSeoRM = (input: string) => {
  input = input.replace(
    `link rel="canonical" href="https://admindsome.devlab.info.vn`,
    `link rel="canonical" href="https://ome.edu.vn`
  );

  input = input.replace(
    `meta property="og:url" content="https://admindsome.devlab.info.vn`,
    `meta property="og:url" content="https://ome.edu.vn`
  );

  input = input.replace(
    `"@id":"https://admindsome.devlab.info.vn#organization"`,
    `"@id":"https://ome.edu.vn/#organization"`
  );

  input = input.replace(
    `https://admindsome.devlab.info.vn#logo`,
    `https://ome.edu.vn/#logo`
  );

  input = input.replace(
    `https://admindsome.devlab.info.vn#website`,
    `https://ome.edu.vn/#website`
  );
  input = input.replace(
    `https://admindsome.devlab.info.vn#webpage`,
    `https://ome.edu.vn/#webpage`
  );
  input = input.replace(
    `"url":"https://admindsome.devlab.info.vn"`,
    `"url":"https://ome.edu.vn"`
  );

  input = input.replace(
    `"@type":"WebPage","@id":"https://admindsome.devlab.info.vn`,
    `"@type":"WebPage","@id":"https://ome.edu.vn`
  );

  input = input.replace(
    `#webpage","url":"https://admindsome.devlab.info.vn`,
    `#webpage","url":"https://ome.edu.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"https://admindsome.devlab.info.vn`,
    `"mainEntityOfPage":{"@id":"https://ome.edu.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"https://admindsome.devlab.info.vn#organization`,
    `"worksFor":{"@id":"https://ome.edu.vn/#organization`
  );

  input = input.replace(
    `"sameAs":["https://admindsome.devlab.info.vn"]`,
    `"sameAs":["https://ome.edu.vn"]`
  );
  input = input.replace("noindex", "index");
  input = input.replace("nofollow", "follow");
  return input;
};
