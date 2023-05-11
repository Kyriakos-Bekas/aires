export type DataToShare = {
  title: string;
  text: string;
  url: string;
};

// Share must be triggered by "user activation"
export const share = async (data: DataToShare) => {
  try {
    await navigator.share(data);
  } catch (err) {
    console.error(`Error during sharing event ${data.title}:`, err);
  }
};
