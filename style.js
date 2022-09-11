let formNode = document.querySelector("form");
formNode.addEventListener("submit", event =>{
    //chặn reset trang
    event.preventDefault(); 
    //clear table
    document.querySelector("table tbody").innerHTML = ""; 
    //lấy dữ liệu
    const loan = Number(document.querySelector("#loan").value);
    const rate = Number(document.querySelector("#rate").value);
    const month = Number(document.querySelector("#month").value);
    const disbursementDate = document.querySelector("#disbursement-date").value;

    //tính lãi xuất
    // lãi xuất = tiền vay * lãi suất(%) * số tháng
    const interest = Math.round((loan*rate*month)/1200);
    
    //tổng lãi và gốc phải trả
    const originalAndInterest = loan + interest;

    //đỗ giá trị vào 2 ô input interest | originalAndInterest
    document.querySelector("#interest").value = interest.toLocaleString();
    document.querySelector("#originalAndInterest").value = originalAndInterest.toLocaleString();

    //lưu danh sách ngày trả tiền dựa trên ngày giải ngân, số tháng cần trả.
    const period = []
    for (let i = 0; i <= month; i++) {
        console.log(period[i - 1]);
        let html;
        if (i === 0) {
            html = `
            <td>${i}</td>
            <td>${handlePeriod(period, disbursementDate, i)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            `
        } else if (i === month) {
            //gốc hằng tháng
            const originalPerMonth = loan - Math.round(loan / month) * (month - 1)
            //lãi hằng tháng
            const interestPerMonth = interest - Math.round((loan * rate) / 1200) * (month - 1)
            //gốc và lãi hằng tháng
            const originalAndInteresPerMonth = originalPerMonth + interestPerMonth

            html = `
            <td>${i}</td>
            <td>${handlePeriod(period, period[i - 1], i)}</td>
            <td>${originalPerMonth.toLocaleString()}</td>
            <td>${interestPerMonth.toLocaleString()}</td>
            <td>${originalAndInteresPerMonth.toLocaleString()}</td>
            <td>0</td>
            `
        } else {
            //gốc hằng tháng
            const originalPerMonth = loan - Math.round(loan / month) * (month - 1)
            //lãi hằng tháng
            const interestPerMonth = interest - Math.round((loan * rate) / 1200) * (month - 1)
            //gốc và lãi hằng tháng
            const originalAndInteresPerMonth = originalPerMonth + interestPerMonth
            //số tiền còn lại phải trả
            const remainingOriginal = loan - originalPerMonth*i
            html = `
                <td>${i}</td>
                <td>${handlePeriod(period, period[i - 1], i)}</td>
                <td>${originalPerMonth.toLocaleString()}</td>
                <td>${interestPerMonth.toLocaleString()}</td>
                <td>${originalAndInteresPerMonth.toLocaleString()}</td>
                <td>${remainingOriginal.toLocaleString()}</td>
            `
        }
        const tr = document.createElement("tr")
        tr.innerHTML = html
        document.querySelector("table tbody").appendChild(tr)
    }
});

function handlePeriod(period, dateString, month) {
    if(month === 0){
        const currentDate = new Date(dateString);
        let str = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        period.push(str)
    }else{
        const pre = new Date(dateString);
        let month = pre.getMonth() + 2;
        let year = pre.getFullYear();
        let date = pre.getDate();
        if(month > 12){
            month = 1;
            year += 1;
        }
        const currentDate = new Date(`${year}-${month}-${date}`)
        console.log(currentDate);
        let str = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        period.push(str)
    }
    return period[month]
}


