export const extractPublicIdFromUrl = (url) => {
    try {
      const startIndex = url.lastIndexOf("/") + 1;
      return url.substring(startIndex);
    } catch (error) {
      console.log(error);
      return null; 
    }
  };