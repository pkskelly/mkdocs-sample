FROM mcr.microsoft.com/powershell:7.1.0-ubuntu-focal

LABEL name="Engineering Manual for T4 Development" \
  description="Development container for maintaining T4 Engineering Manual" \
  homepage="https://t4.github.io/documents" \
  maintainers="Pete Skelly <petesklly@gmail.com>"

# ENV NPM_CONFIG_PREFIX=/home/cli-microsoft365-dev/.npm-global \
#   PATH=$PATH:/home/cli-microsoft365-dev/.npm-global/bin

RUN apt-get update && apt-get install -y \
  git \
  curl \
  sudo \
  zsh \
  jq \
  vim \
  python3.8 \
  python3-pip \
  weasyprint \
  && curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - \
  && apt-get install nodejs -y \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install mkdocs-material==7.1.7 pymdown-extensions==9.0 mkdocs-mermaid2-plugin mkdocs-pdf-export-plugin mkdocs-git-revision-date-localized-plugin

# # [Optional] If your pip requirements rarely change, uncomment this section to add them to the image.
# COPY requirements-docs.txt /tmp/pip-tmp/
# RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements-docs.txt \
#   && rm -rf /tmp/pip-tmp

RUN useradd \
  --user-group \
  --system \
  --create-home \
  --no-log-init \
  t4-dev
  
USER t4-dev

WORKDIR /home/mkdocs-sample

RUN zsh -c "$(curl https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" --unattended \
 && git clone https://github.com/denysdovhan/spaceship-prompt.git "$HOME/.oh-my-zsh/custom/themes/spaceship-prompt" --depth=1 \
 && ln -s "$HOME/.oh-my-zsh/custom/themes/spaceship-prompt/spaceship.zsh-theme" "$HOME/.oh-my-zsh/custom/themes/spaceship.zsh-theme" \
 && cp "$HOME/.oh-my-zsh/templates/zshrc.zsh-template" $HOME/.zshrc \
 && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting \
 && git clone https://github.com/zsh-users/zsh-autosuggestions $HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
 && sed -i "11s/ZSH_THEME=\"robbyrussell\"/ZSH_THEME=\"spaceship\"/" ~/.zshrc \
 && sed -i "27s/# DISABLE_AUTO_UPDATE=\"true\"/DISABLE_AUTO_UPDATE=\"true\"/" ~/.zshrc \
 && sed -i "73s/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/" ~/.zshrc \
 && sed -i "50s/# COMPLETION_WAITING_DOTS/COMPLETION_WAITING_DOTS/" ~/.zshrc

CMD [ "/bin/zsh", "-l" ]
