import React from 'react'
import guide from '../assets/guide.png';

interface Props {
  show: boolean
  onClose: () => void
}

function WhereToDownloadCsv({ show, onClose }: Props) {
  if (!show) return null;
  return (
    <div className="fixed z-50 inset-0 flex bg-black/30">
      <div className="m-auto w-full max-w-2xl">
        <div className="bg-white p-3 space-y-4">
          <div className="flex flex-wrap">
            <div className="flex-1 pr-3">
              <img className="w-full" src={guide} />
            </div>
            <div className="flex-shrink-0">
              <div className="font-bold">Where to get Attendance CSV?</div>
              <ul className="list-decimal pl-6">
                <li>Click <b>My Team</b></li>
                <li>Click <b>Time Reports</b></li>
                <li>Click <b>Daily Attendance</b></li>
                <li>Click <b>Export</b></li>
                <li>Click <b>Summary</b></li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={() => {
              onClose();
            }}>Got it</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhereToDownloadCsv