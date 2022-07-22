import { ReactNode } from 'react'

interface BrowserWindowProps {
  children: ReactNode
}
export const BrowserWindow = ({ children }: BrowserWindowProps) => {
  return (
    <div className="browserWindow">
      <div className="browserWrapper">
        <div className="browserTopBar">
          <div className="topBarButtons">
            <div className="topBarButton" />
            <div className="topBarButton" />
            <div className="topBarButton" />
          </div>
          <div className="urlBar">
            <ul className="urlBarList">
              <li className="urlInputListItem">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="InlineSVG FakeChrome-URLBarIcon"
                  focusable="false"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5 3.5V2.5C1.5 1.11929 2.61929 0 4 0C5.38071 0 6.5 1.11929 6.5 2.5V3.5H6.75C7.02614 3.5 7.25 3.72386 7.25 4V7C7.25 7.55228 6.80228 8 6.25 8H1.75C1.19772 8 0.75 7.55228 0.75 7V4C0.75 3.72386 0.973858 3.5 1.25 3.5H1.5ZM4 4.75C3.72386 4.75 3.5 4.97386 3.5 5.25V6.25C3.5 6.52614 3.72386 6.75 4 6.75C4.27614 6.75 4.5 6.52614 4.5 6.25V5.25C4.5 4.97386 4.27614 4.75 4 4.75ZM5.5 3.5V2.5C5.5 1.67157 4.82843 1 4 1C3.17157 1 2.5 1.67157 2.5 2.5V3.5H5.5Z"
                    fill="#6B7A94"
                  ></path>
                </svg>
                <div className="ml-1">yourdomain.com</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="browserBody">{children}</div>
      </div>
    </div>
  )
}
