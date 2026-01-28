import { useMemo, useState } from 'react'

interface PreviewProps {
  html: string
}

const PC_WIDTH = 1440
const PC_HEIGHT = 900

function wrapInHtmlDocument(content: string): string {
  const trimmed = content.trim().toLowerCase()
  if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')) {
    return content
  }

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body>
${content}
</body>
</html>`
}

export function Preview({ html }: PreviewProps) {
  const processedHtml = wrapInHtmlDocument(html)

  /** 表示倍率（UI 操作用） */
  const [zoom, setZoom] = useState(1.0)

  /** laptop-screen の内幅（padding 考慮） */
  const BASE_VIEWPORT_WIDTH = 640 - 24 // padding 左右 12px
  const autoScale = BASE_VIEWPORT_WIDTH / PC_WIDTH

  const scale = useMemo(() => autoScale * zoom, [autoScale, zoom])

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 p-4 gap-4">
      {/* ===== Controls ===== */}
      <div className="flex items-center gap-3 px-2">
        <span className="text-sm text-gray-600">表示倍率</span>
        <input
          type="range"
          min={0.5}
          max={1}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm w-12 text-right">
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* ===== Preview ===== */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="laptop-mockup">
          <div className="laptop-screen">
            <div className="browser-toolbar">
              <div className="browser-buttons">
                <span className="browser-btn close" />
                <span className="browser-btn minimize" />
                <span className="browser-btn maximize" />
              </div>
              <div className="browser-address-bar">
                <span className="address-text">preview://localhost</span>
              </div>
            </div>

            <div className="iframe-viewport">
              <div
                className="iframe-scale-wrapper"
                style={{
                  transform: `scale(${scale})`,
                }}
              >
                <iframe
                  srcDoc={processedHtml}
                  title="Preview"
                  sandbox="allow-scripts"
                  className="laptop-iframe"
                />
              </div>
            </div>
          </div>

          <div className="laptop-base">
            <div className="laptop-keyboard" />
            <div className="laptop-trackpad" />
          </div>
          <div className="laptop-bottom" />
        </div>
      </div>

      <style>{`
        .laptop-mockup {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .laptop-screen {
          width: 640px;
          height: 430px;
          background: #1a1a1a;
          border-radius: 12px 12px 0 0;
          padding: 12px 12px 0 12px;
          box-shadow:
            inset 0 0 0 2px #333,
            0 -2px 20px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
        }

        .browser-toolbar {
          height: 32px;
          background: linear-gradient(to bottom, #e8e8e8, #d0d0d0);
          border-radius: 6px 6px 0 0;
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 10px;
          flex-shrink: 0;
        }

        .browser-buttons {
          display: flex;
          gap: 6px;
        }

        .browser-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .browser-btn.close { background: #ff5f57; }
        .browser-btn.minimize { background: #ffbd2e; }
        .browser-btn.maximize { background: #28c840; }

        .browser-address-bar {
          flex: 1;
          background: white;
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 11px;
          color: #666;
          overflow: hidden;
        }

        .iframe-viewport {
          flex: 1;
          overflow: hidden;
          background: white;
          border-radius: 0 0 4px 4px;
          position: relative;
        }

        .iframe-scale-wrapper {
          width: ${PC_WIDTH}px;
          height: ${PC_HEIGHT}px;
          transform-origin: top left;
        }

        .laptop-iframe {
          width: ${PC_WIDTH}px;
          height: ${PC_HEIGHT}px;
          border: none;
          background: white;
        }

        .laptop-base {
          width: 700px;
          height: 24px;
          background: linear-gradient(to bottom, #c5c5c7, #a8a8aa);
          border-radius: 0 0 2px 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .laptop-keyboard {
          width: 60%;
          height: 4px;
          background: linear-gradient(to bottom, #888, #999);
          border-radius: 2px;
          margin-top: 2px;
        }

        .laptop-trackpad {
          width: 25%;
          height: 6px;
          background: linear-gradient(to bottom, #999, #aaa);
          border-radius: 2px;
          margin-top: 3px;
        }

        .laptop-bottom {
          width: 700px;
          height: 8px;
          background: linear-gradient(to bottom, #909092, #707072);
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
