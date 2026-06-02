const ExcelJS = require('exceljs');
const {test, expect}=require('@playwright/test');

let output= {row:-1, column:-1};
async function writeExcelTest(searchText, replaceText,change, filePath){
    

const workBook= new ExcelJS.Workbook();
await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet('Sheet1');
   await readExcel(workSheet, searchText);
  
const cellNo= workSheet.getCell(output.row,output.column+change.colChnage);
cellNo.value= replaceText;
await workBook.xlsx.writeFile(filePath);
}

async function readExcel(workSheet,searchText){
    workSheet.eachRow( (row, rowNumber)=>{
    row.eachCell((cell, colNumber)=>{
        if(cell.value===searchText){
            console.log(rowNumber,+'  '+colNumber);
            output.row=rowNumber;
            output.column=colNumber;
           
        }
    });
});
}


//writeExcelTest("Banana",350,{rowChange:0,colChnage:2},"C:\\Users\\sarda\\Downloads\\download.xlsx");


/*const workBook= new ExcelJS.Workbook();
workBook.xlsx.readFile("C:\\Users\\sarda\\Downloads\\download.xlsx").then(function(){
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow( (row, rowNumber)=>{
    row.eachCell((cell, colNumber)=>{
        console.log(cell.value);
    });
});
})*/


test('Upload download excel validation',async({page})=>{

    const textSearch ="Mango";
    const filePath="C:\\Users\\sarda\\Downloads\\download.xlsx";
    const updatedValue='999';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    await downloadPromise;
    const download = await downloadPromise;
    await download.saveAs(filePath);
    await writeExcelTest("Mango",updatedValue,{rowChange:0,colChnage:2},filePath);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator=page.getByText(textSearch);

    const desiredRow= await page.getByRole('row').filter({has:textLocator});

    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);
    //await page.pause();
})