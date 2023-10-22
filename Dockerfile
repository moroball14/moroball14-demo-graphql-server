FROM node:18

# 作業ディレクトリを指定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonを/usr/src/appにコピー
COPY package*.json ./

# npm installを実行
RUN npm install

# ファイルを/usr/src/appにコピー
COPY . .

# コンテナ起動時に実行するスクリプトを指定
COPY scripts/docker-entrypoint.sh /usr/src/app/scripts/docker-entrypoint.sh

# 実行権限を付与
RUN chmod +x /usr/src/app/scripts/docker-entrypoint.sh

ENTRYPOINT ["/usr/src/app/scripts/docker-entrypoint.sh"]