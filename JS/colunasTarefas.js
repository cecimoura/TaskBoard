
const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart",(e)=>{
    e.target.classList.add("draging");
});

document.addEventListener("dragend",(e)=>{
    e.target.classList.remove("draging");
});


columns.forEach(item) => {
    item.addEventListener("dragover", (e)=>{
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(item, e.clientY);
    });
}