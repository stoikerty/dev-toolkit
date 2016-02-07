// Check whether a given breakpoint exists
//
// Examples:
// if (breakpoint('phone smart'))
//    runFunctionForSmallDevices();
//
// if (breakpoint('tablet7 tablet10 pcsmall pclarge'))
//    runFunctionForLargeDevices();

export default (devices)=> {
  // split string into array for easier processing
  devices = devices.split(" ");

  let breakpointExists = false;
  // Should be the equal to variables `stylesheets/_global-config.scss`
  let breakpoints = [
    { name: 'phone',    width: 0    },
    { name: 'smart',    width: 300  },
    { name: 'tablet7',  width: 440  },
    { name: 'tablet10', width: 768  },
    { name: 'pcsmall',  width: 992  },
    { name: 'pclarge',  width: 1200 }
  ];
  // Cross-browser @media (width) and @media (height) values
  // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  // return true if one of the called breakpoints exists
  for (let i=0; i< breakpoints.length; i++){
    if (devices.indexOf(breakpoints[i].name) > -1) {
      let minWidth = breakpoints[i].width;
      let maxWidth;

      if (i === (breakpoints.length - 1))
        maxWidth = 999999;
      else
        maxWidth = breakpoints[i+1].width;


      if ((width > minWidth) && (width < maxWidth)){
        breakpointExists = true;
      }
    }
  }

  return breakpointExists;
};
