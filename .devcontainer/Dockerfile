FROM alpine:3.20

ARG USERNAME=default
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apk update && \
    apk upgrade && \
    apk add sudo shadow openssh build-base \
    openssl-dev npm bash git zsh bind-tools curl wget binutils libc6-compat

RUN apk --no-cache add ca-certificates && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-2.33-r0.apk && \
    apk add --force-overwrite glibc-2.33-r0.apk && \
    rm glibc-2.33-r0.apk

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME

RUN sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)" && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/mafredri/zsh-async ~/.oh-my-zsh/plugins/async && \
    git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm && \
    sed -i "s/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting async zsh-nvm)/g" ~/.zshrc

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/${USERNAME}/.bun/bin:$PATH"

RUN echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.zshrc
RUN echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.zshrc
RUN echo 'alias bunx="bun x"' >> ~/.zshrc

RUN echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
RUN echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
RUN echo 'alias bunx="bun x"' >> ~/.bashrc

ENTRYPOINT ["/bin/zsh"]
