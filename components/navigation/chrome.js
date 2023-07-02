export default function Chrome({ lastUpdated }) {

  return (
    <div className="fixed w-full h-full pointer-events-none z-50">
      {/* <span className="logo"></span> */}

      {/* <div className="absolute top-6 left-6 pointer-events-auto">
        <div className="inset inset--top-left">test</div>
      </div>
      <div className="absolute top-6 right-6 pointer-events-auto">
        <div className="inset inset--top-right">test</div>
      </div> */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <div className="pb-6 pl-16 text-xs">Last Updated : {lastUpdated}</div>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <div className="pb-6 pr-16 text-xs">Location Temp</div>
      </div>
    </div>
  );
}
