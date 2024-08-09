class MailService {
  constructor() {}
  public sendActivationMail = async (to: string, link: string) => {
    console.log(`Activation link: ${link}`);
  };
}

export { MailService };
