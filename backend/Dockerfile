FROM node:18-bullseye

RUN apt-get update && apt-get install -y \
    build-essential \
    g++ \
    gcc \
    python3 \
    python3-pip \
    openjdk-17-jdk \
    curl \
    git \
    ruby \
    golang-go \
    bash \
    dos2unix \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN echo 'IyEvYmluL2Jhc2gKCiMgSW5wdXQ6ICQxID0gbGFuZ3VhZ2UsICQyID0gY29kZSBmaWxlIHBhdGgsICQzID0gaW5wdXQgZmlsZSBwYXRoCgpMQU5HVUFHRT0kMQpDT0RFX0ZJTEU9JDIKSU5QVVRfRklMRT0kMwoKY2FzZSAiJExBTkdVQUdFIiBpbgogIGNwcCkKICAgIGcrKyAiJENPREVfRklMRSIgLW8gL2FwcC9wcm9ncmFtICYmIC9hcHAvcHJvZ3JhbSA8ICIkSU5QVVRfRklMRSIKICAgIDs7CiAgYykKICAgIGdjYyAiJENPREVfRklMRSIgLW8gL2FwcC9wcm9ncmFtICYmIC9hcHAvcHJvZ3JhbSA8ICIkSU5QVVRfRklMRSIKICAgIDs7CiAgcHl0aG9uKQogICAgcHl0aG9uMyAiJENPREVfRklMRSIgPCAiJElOUFVUX0ZJTEUiCiAgICA7OwogIGphdmEpCiAgICBGSUxFX0RJUj0kKGRpcm5hbWUgIiRDT0RFX0ZJTEUiKQogICAgQ0xBU1NfTkFNRT0kKGdyZXAgLW9QICdwdWJsaWNcc1wrY2xhc3Ncc1wrXEtcd1srJyAiJENPREVfRklMRSIpCiAgICBpZiBbIC16ICIkQ0xBU1NfTkFNRSIgXTsgdGhlbgogICAgICAgIGVjaG8gIkVycm9yOiBDb3VsZCBub3QgZGV0ZXJtaW5lIHB1YmxpYyBjbGFzcyBuYW1lLiIKICAgICAgICBleGl0IDEKICAgIGZpCiAgICBybSAtZiAiJEZJTEVfRElSIi8qLmNsYXNzCiAgICBjcCAiJENPREVfRklMRSIgIiRGSUxFX0RJUi8kQ0xBU1NfTkFNRS5qYXZhIgogICAgamF2YWMgIiRGSUxFX0RJUi8kQ0xBU1NfTkFNRS5qYXZhIgogICAgaWYgWyAkPyAtZXEgMCBdOyB0aGVuCiAgICAgICAgamF2YSAtY3AgIiRGSUxFX0RJUiIgIiRDTEFTU19OQU1FIiA8ICIkSU5QVVRfRklMRSIKICAgIGVsc2UKICAgICAgICBlY2hvICJDb21waWxhdGlvbiBmYWlsZWQuIgogICAgZmkKICAgIDs7CiAgamF2YXNjcmlwdHxqcykKICAgIEZJTEVfRElSPSQoZGlybmFtZSAiJENPREVfRklMRSIpCiAgICBUTVBfSlM9IiRGSUxFX0RJUi90bXBfcnVuX2ZpbGUuanMiCiAgICBbIC1mICIkVE1QX0pTIiBdICYmIHJtICIkVE1QX0pTIgogICAgY3AgIiRDT0RFX0ZJTEUiICIkVE1QX0pTIgogICAgaWYgWyAhIC1mICIkSU5QVVRfRklMRSIgXSB8fCBbICEgLXMgIiRJTlBVVF9GSUxFIiBdOyB0aGVuCiAgICAgIG5vZGUgIiRUTVBfSlMiCiAgICBlbHNlCiAgICAgIGNhdCAiJElOUFVUX0ZJTEUiIHwgbm9kZSAiJFRNUF9KUyIKICAgIGZpCiAgICBybSAtZiAiJFRNUF9KUyIKICAgIDs7CiAgZ28pCiAgICBnbyBydW4gIiRDT0RFX0ZJTEUiIDwgIiRJTlBVVF9GSUxFIgogICAgOzsKICBydWJ5KQogICAgcnVieSAiJENPREVfRklMRSIgPCAiJElOUFVUX0ZJTEUiCiAgICA7OwogIGJhc2gpCiAgICBiYXNoICIkQ09ERV9GSUxFIiA8ICIkSU5QVVRfRklMRSIKICAgIDs7CiAgKikKICAgIGVjaG8gIlVuc3VwcG9ydGVkIGxhbmd1YWdlOiAkTEFOR1VBR0UiCiAgICA7Owplc2FjCg==' | base64 -d > /app/run.sh && dos2unix /app/run.sh && chmod +x /app/run.sh

EXPOSE 5000

CMD ["npm", "start"]

