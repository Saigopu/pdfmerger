
//the purpose of this file to test the code taken from the sites whether they are working fine with the modules and producing correct output
//the below code is taken from https://www.npmjs.com/package/pdf-merger-js and started editing

const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const mergePdfs= async (p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2
  
  let d=new Date().getTime()
  await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
  return d;
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
}

module.exports={mergePdfs}