import axios from "axios"
//@ts-ignore
// import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
export function showError(validator: any, error_message = ""){
  if(validator.$invalid && validator.$dirty){
      return error_message.length > 0 ? error_message :  validator.$errors[0].$message
  }

  return ""
}
export const api = axios.create({
  // baseURL: 'https://www.inventivemedia.com.ph/ojt/public',
  baseURL: process.env.API_LOCAL_URL,
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json',
  }
})

export interface link{
  url: string,
  label: string,
  active: boolean
}

export interface Page{
  current_page: number,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: link[];
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
  to: number,
  total: number,
  query: string,

}

export function getMonth(value: number){
  const now = new Date()
  const date = new Date(now.getFullYear(), value)


  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return months[date.getMonth()]
}

export function getDay(value: number){
  const months = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return months[value]
}

export function getAllDayInMonth(currentMonth: number){
  const currentDate = new Date(new Date().getFullYear(), currentMonth);
  const fullYear = currentDate.getFullYear();
  const month = currentDate.getMonth();
  currentDate.setDate(1)
  const first_date = new Date(currentDate)
  first_date.setDate(-(first_date.getDay() - 1))
  const afterMonth = new Date(fullYear, month + 1)
  const last_date = afterMonth
  last_date.setDate(0)
  last_date.setDate(last_date.getDate() + (7 - last_date.getDay()))
  const dateContainer = []

  while(first_date < last_date){
      dateContainer.push(new Date(first_date))
      first_date.setDate(first_date.getDate() + 1)
  }

  return dateContainer
}

export function convertToStandardTime(time: string){
  const hour = time.substring(0, 2)
  const minutes = time.substring(3,5)

  return parseInt(hour) > 12 ? parseInt(hour) - 12  + ':' + minutes + ' PM' : parseInt(hour)  + ':' + minutes + ' AM'
}



// export const attendanceSheetPdf = async () => {
//   const pdfDoc = await PDFDocument.create()
//   const page = pdfDoc.addPage()
//   const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
//   const Helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
//   const page_height = 768
//   const page_width = 1056
//   const page_margin = 50

//   page.setSize(page_width, page_height)

//   page.drawText("Student Attendance Sheet", {
//     x: page_margin,
//     y: page_height - 55,
//     size: 35,
//     font: Helvetica,
//     color: rgb(.2, .2, .2)
//   })



//   return await pdfDoc.saveAsBase64({dataUri: true})

// }
