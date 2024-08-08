FROM ubuntu:24.10

ARG USERNAME=default
ARG USER_UID=1000
ARG USER_GID=${USER_UID}


RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y sudo openssh-server openssl build-essential \
    libssl-dev nodejs npm bash git zsh dnsutils curl wget binutils libc6 unzip

RUN userdel -r ubuntu

RUN if ! getent group ${USER_GID}; then groupadd --gid ${USER_GID} ${USERNAME}; fi && \
useradd --uid $USER_UID --gid ${USER_GID} -m ${USERNAME} && \
echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} && \
chmod 0440 /etc/sudoers.d/${USERNAME}


USER ${USERNAME}

RUN sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)" && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/mafredri/zsh-async ~/.oh-my-zsh/plugins/async && \
    git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm && \
    sed -i "s/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting async zsh-nvm)/g" ~/.zshrc


RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/${USERNAME}/.bun/bin:${PATH}"

RUN echo 'export BUN_INSTALL="${HOME}/.bun"' >> ~/.zshrc
RUN echo 'export PATH="${BUN_INSTALL}/bin:${PATH}"' >> ~/.zshrc
RUN echo 'alias bunx="bun x"' >> ~/.zshrc

RUN echo 'export PATH="${HOME}/.bun/bin:${PATH}"' >> ~/.bashrc
RUN echo 'export BUN_INSTALL="${HOME}/.bun"' >> ~/.bashrc
RUN echo 'alias bunx="bun x"' >> ~/.bashrc

ENTRYPOINT ["/bin/zsh"]
