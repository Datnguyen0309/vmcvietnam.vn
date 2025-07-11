export const replaceSeoRM = (input: string) => {
  input = input.replace(
    `link rel="canonical" href="https://admindsome.devlab.info.vn`,
    `link rel="canonical" href="https://evome.devlab.info.vn`
  );

  input = input.replace(
    `meta property="og:url" content="https://admindsome.devlab.info.vn`,
    `meta property="og:url" content="https://evome.devlab.info.vn`
  );

  input = input.replace(
    `"@id":"https://admindsome.devlab.info.vn/#organization"`,
    `"@id":"https://evome.devlab.info.vn/#organization"`
  );

  input = input.replace(
    `https://admindsome.devlab.info.vn/#logo`,
    `https://evome.devlab.info.vn/#logo`
  );

  input = input.replace(
    `https://admindsome.devlab.info.vn/#website`,
    `https://evome.devlab.info.vn/#website`
  );
  input = input.replace(
    `https://admindsome.devlab.info.vn/#webpage`,
    `https://evome.devlab.info.vn/#webpage`
  );
  input = input.replace(
    `"url":"https://admindsome.devlab.info.vn"`,
    `"url":"https://evome.devlab.info.vn"`
  );

  input = input.replace(
    `"@type":"WebPage","@id":"https://admindsome.devlab.info.vn`,
    `"@type":"WebPage","@id":"https://evome.devlab.info.vn`
  );

  input = input.replace(
    `#webpage","url":"https://admindsome.devlab.info.vn`,
    `#webpage","url":"https://evome.devlab.info.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"https://admindsome.devlab.info.vn`,
    `"mainEntityOfPage":{"@id":"https://evome.devlab.info.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"https://admindsome.devlab.info.vn/#organization`,
    `"worksFor":{"@id":"https://evome.devlab.info.vn/#organization`
  );

  input = input.replace(
    `"sameAs":["https://admindsome.devlab.info.vn"]`,
    `"sameAs":["https://evome.devlab.info.vn"]`
  );
  input = input.replace("noindex", "index");
  input = input.replace("nofollow", "follow");
  return input;
};
