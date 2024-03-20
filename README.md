# Step1 クライアントとサーバー

## １. 開発環境の構築
**開発環境**とは、アプリケーションを開発するための作業環境やツールのことを言います。  
また、開発環境を整えることを**環境構築**といいます。

### Gitの導入

- `GitHub`の[公式サイト](https://github.co.jp)からアカウントを作成します。

- `Git` を[公式サイト](https://git-scm.com/downloads)からインストールします。  
インストール手順&ensp;=>&emsp;[Windows](https://www.curict.com/item/60/60bfe0e.html)&emsp;|&emsp;[Mac](https://zenn.dev/inablog/articles/25f6ac101d0b45)[^1]

[^1]: MacにHomebrewがインストールされていない場合は、[こちら](https://aiacademy.jp/media/?p=2817)を参考にインストールしてください。

- このリポジトリを[Fork](https://docs.github.com/ja/get-started/quickstart/fork-a-repo)します。

- `Fork`[^2]を[こちら](https://git-fork.com/)からインストールします。
  - Forkの使い方は[こちら](https://qiita.com/AyakoKataoka/items/e1b0a2a2b2c85de4c1e3)
  - インストール後は、参考サイトを見て、`GitHub`のアカウントでサインインしておいて下さい。

[^2]: ここの`Fork`はGUIツールの名称を指します。`GitHub`での`Fork`は他ユーザーのリポジトリを自分のリポジトリに複製することを指します。

- ローカル上の任意の場所にリポジトリのクローンを作成します。
  - CLIでの作成方法  
      (1) `Git Bash`もしくは `terminal`を起動します。  
      (2) `cd` コマンドでリポジトリをクローンしたいフォルダに移動します。  
      (3) `git clone {リポジトリのURL}`&nbsp;を入力し、Enterを押します。
  
  - `Fork`アプリでの作成方法(こちらが簡単です)  
      (1) 左上のFileをクリックし、Accounts...をクリックします。  
      (2) Repositoryタブを開くと、自分のリポジトリの一覧が表示されます。  
      (3) training-warehouse-management_jpの下向き矢印をクリックして下さい。  
      (4) Parent Folderでクローンを作成する場所を選択し、Cloneをクリックします。

### Javaのインストール・環境変数[^3]の設定

[^3]: 環境変数とは、OSが動作しているときに使用する変数(値を入れておく箱)のことです。ファイルやディレクトリの場所を示す文字列(パス)を入れておくことで、どんなに深い階層のファイルやディレクトリでも一気に開くことができます。


- [こちら](https://www.oracle.com/java/technologies/downloads/#java11)のサイトから`JDK11` をインストールします。
  - **`JDK11`をどこにインストールしたのか、確認しておいてください。**
  - **必ず、`JDK11`をインストールしてください。他のverだと正常に動作しない可能性があります。**
  - **インストールの際は、Oracleのアカウントが必要になります。**

- 環境変数を設定します。
  - Windowsの場合
    - システムの環境変数の[新規(W)]をクリック
    - 変数名：`JAVA_HOME`
    - 変数値：`{JDKをインストールしたフォルダのパス}`
    - システムの環境変数の`Path`を選択し、[編集(I)]をクリック
    - [新規(N)]をクリックし、`%JAVA_HOME%\bin` を入力
    - 参考サイトは[こちら](https://www.javadrive.jp/start/install/index4.html)

  - Macの場合
    - `terminal`を起動
    - `/usr/libexec/java_home -v 11`を入力
    - 出力されたパスをコピー
    - `export JAVA_HOME=[コピーしたパス]`を入力
    - `export PATH=${JAVA_HOME}/bin:${PATH}`を入力
    - 参考サイトは[こちら](https://qiita.com/niwasawa/items/460ccd0fa0041e7a2491)


### IntellijとVSCodeのインストール

- [こちら](https://www.jetbrains.com/ja-jp/idea/download/other.html)から`Intellij IDEA Community Edition`をインストールします。
  - File -> New -> Project -> Project from existing source -> `beginner/demo/demo` -> import project from external model -> Gradleを選択 -> Create
  - files -> Project Structure -> Platform Settings -> SDKs -> 11を選択 -> OK
  - [参考画像](https://github.com/Git-MuramatsuT/training-warehouse-management_jp/blob/step1-client-and-server/intellij.md)

- [こちら](https://code.visualstudio.com/)から`VSCode`をインストールします。
  - 下記の拡張機能をインストールしておいて下さい。
    - HTML CSS Support
    - Javascript (ES6) code snippets
    - Live Server
  - [参考サイト](https://qiita.com/KNR109/items/5f933df1292564e6dc70)

### Dockerのインストール

- [こちら](https://docs.docker.com/desktop/install/windows-install/)から`Docker Desktop`[^4] をインストールします。
  - [参考サイト](https://www.kagoya.jp/howto/cloud/container/wsl2_docker/)

[^4]: `Docker Desktop`を起動する前に、WSL Linuxカーネルを更新しなければいけない場合があります(Windows)。[こちら](https://kb.seeck.jp/archives/16956)を参考に更新してください。

- 以下の指示に従って、Dockerコンテナを起動してください。
   1. `Git Bash`もしくは `terminal`を起動します。
   2. `cd`コマンドで クローンしたプロジェクト に移動します。  
   3. こちらのコマンドを入力し、.shファイルを実行して下さい。
  `./beginner/demo/demo/local/start.sh`  
  .shファイルの詳しい実行方法については[こちら](https://linuxfan.info/post-1486)を参考にして下さい。

## 2. クライアントサイドとサーバーサイド

このプロジェクトでは、コードを２つのパートに分割しています。
- クライアントサイド  
&nbsp;… クライアントで表示または実行されるWebアプリケーションの全てを指します。今回のプロジェクトでは、HTML, CSS, JavaScriptで記述されています。
ユーザーが直感的に操作できるようにUIを提供します。

- サーバーサイド  
&nbsp;… サーバーで動くプログラムなどを指します。
今回のプロジェクトでは、Javaで記述されています。
クライアント側から送られてきたアクションを受け取り、ストレージへのデータの保存などを行います。
（このプロジェクトでは、ストレージにPostgresデータベースを利用します。）


## 3. Tutorial
Javaは`IntelliJ`で、HTML、JavaScript、CSSは`VSCode`で編集しましょう。

1. サーバーを立ち上げましょう。  
`IntelliJ`を起動 -> open -> `training-warehouse-management_jp/beginner/demo/demo`  
DemoApplication.javaを右クリック -> Run DemoApplication.main()  
terminalで
`Tomcat started on port(s): 8080 (http)`
と表示されれば、成功です。  
ブラウザで localhost:8080/hello と入力すると、
メッセージが表示されるはずです。  
文字化けエラーの解決方法は[こちら](https://github.com/Git-MuramatsuT/training-warehouse-management_jp/blob/step1-client-and-server/mojibake.md)

3. UIを表示しましょう  
`VSCode`を起動 -> open -> `training-warehouse-management_jp/beginner/ui` -> `index.html`を右クリック -> Open with Live Server  
ブラウザでHTMLファイルが開きます。  
3つのボタンをクリックして、何が表示されるか見てみましょう。

4. `index.html`と`index.js`のコードを見て、HTML, JavaScriptの基本を学びましょう。
補助資料のp10~p14には、HTML及びJavaScriptの基本について書かれています。参考にしながら、`index.html`や`index.js`には、どのようなことが書かれているのかコードを解読してください。


## 4. Exercise
`Make me Show the message from Java`をクリックしたときに表示されるメッセージを`ExerciseController.java`からのものに変更してください。  
ヒント：`index.js`の`helloExercise()`を編集する必要があります。どのエンドポイントにリクエストを送れば、`ExerciseController.java`からのレスポンスが返ってくるのかを考えましょう。
