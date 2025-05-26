# Google Tag Manager セットアップガイド

このプロジェクトにGoogle Tag Manager（GTM）が導入されました。

## セットアップ手順

1. **GTM IDの設定**
   `.env.local`ファイルの`NEXT_PUBLIC_GTM_ID`を実際のGTM IDに変更してください：
   ```
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

2. **GTM IDの取得方法**
   - [Google Tag Manager](https://tagmanager.google.com/)にアクセス
   - アカウントを作成またはログイン
   - 新しいコンテナを作成
   - コンテナIDをコピー（GTM-XXXXXXXの形式）

## 実装内容

- `components/gtm.tsx`: GTMスクリプトとnoscriptタグのコンポーネント
- `app/layout.tsx`: GTMコンポーネントの統合
- `.env.local`: GTM IDの環境変数設定

## Google Analytics 4 (GA4) 設定

### GTMでのGA4設定手順

1. **GA4測定IDの取得**
   - [Google Analytics](https://analytics.google.com/)にアクセス
   - プロパティを作成し、測定ID（G-XXXXXXXXXXの形式）を取得

2. **GTMでGA4設定タグを作成**
   - GTMコンテナで「タグ」→「新規」をクリック
   - タグタイプ：「Google Analytics: GA4設定」を選択
   - 測定IDを入力
   - トリガー：「All Pages」を選択

3. **キーボードイベント用のカスタムイベントタグを作成**
   - 新しいタグを作成
   - タグタイプ：「Google Analytics: GA4イベント」を選択
   - 設定タグ：上記で作成したGA4設定タグを選択
   - イベント名：`key_press`
   - カスタムパラメータ：
     - `key_pressed`: `{{key_pressed}}`
     - `key_type`: `{{key_type}}`
   - トリガー：カスタムイベント「key_press」

4. **セッション統計用のカスタムイベントタグを作成**
   - 新しいタグを作成
   - タグタイプ：「Google Analytics: GA4イベント」を選択
   - 設定タグ：上記で作成したGA4設定タグを選択
   - イベント名：`keyboard_session`
   - カスタムパラメータ：
     - `total_keys_pressed`: `{{total_keys_pressed}}`
     - `session_duration_seconds`: `{{session_duration_seconds}}`
     - `keys_per_minute`: `{{keys_per_minute}}`
   - トリガー：カスタムイベント「keyboard_session」

5. **変数の作成**
   - 以下のデータレイヤー変数を作成：
     - `key_pressed`
     - `key_type`
     - `total_keys_pressed`
     - `session_duration_seconds`
     - `keys_per_minute`

## 送信されるイベント

### key_press イベント
- **イベント名**: `key_press`
- **パラメータ**:
  - `key_pressed`: 押されたキー（例：A, SPACE, ENTER）
  - `key_type`: キーの種類（letter, number, special, modifier）
  - `timestamp`: イベント発生時刻

### keyboard_session イベント
- **イベント名**: `keyboard_session`
- **パラメータ**:
  - `total_keys_pressed`: セッション中の総キー数
  - `session_duration_seconds`: セッション継続時間（秒）
  - `keys_per_minute`: 1分あたりのキー数

## 動作確認

1. 開発サーバーを起動：
   ```bash
   npm run dev
   # または
   pnpm dev
   ```

2. ブラウザの開発者ツールでネットワークタブを確認し、GTMスクリプトが読み込まれていることを確認

3. Google Tag Manager Previewモードでタグの動作を確認

4. キーを押してイベントが送信されることを確認

5. GA4のリアルタイムレポートでイベントが記録されることを確認

## 注意事項

- `.env.local`ファイルはGitにコミットされません
- 本番環境では環境変数を適切に設定してください
- GTM IDが設定されていない場合、GTMスクリプトは読み込まれません
- セッション統計は30秒ごとに自動送信されます
- コンポーネントがアンマウントされる際に最終的なセッション統計が送信されます
