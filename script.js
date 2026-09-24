const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.5;
const scenes = [...document.querySelectorAll(".scene")];
const go = (id) => {
  scenes.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
};

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => go(btn.dataset.go));
});

const toast = document.getElementById("toast");
function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1700);
}

document.getElementById("startBtn").addEventListener("click", () => {
    bgMusic.play()
        .then(() => {
            console.log("Musik berhasil diputar");
        })
        .catch((error) => {
            console.log("Musik gagal diputar:", error);
        });

    go("letter");

    setTimeout(() => {
        showToast("A small note, just for you ✦");
    }, 500);
});

const envelope = document.getElementById("envelope");
const openLetterBtn = document.getElementById("openLetterBtn");
let opened = false;

openLetterBtn.addEventListener("click", () => {
  opened = !opened;
  envelope.querySelector(".envelope").classList.toggle("open", opened);
  openLetterBtn.textContent = opened ? "CONTINUE TO MEMORIES →" : "OPEN MY MESSAGE";
  if(opened) showToast("Message opened ✦");
  if(opened){
    openLetterBtn.onclick = () => go("memories");
  }
});

document.querySelectorAll(".memory").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("modalNo").textContent = card.dataset.title.replace(/\D/g,"").padStart(2,"0");
    document.getElementById("modalTitle").textContent = card.dataset.title;
    document.getElementById("modalText").textContent = card.dataset.text;
    document.getElementById("memoryModal").classList.add("show");
  });
});

document.getElementById("modalClose").addEventListener("click",()=>{
  document.getElementById("memoryModal").classList.remove("show");
});
document.getElementById("memoryModal").addEventListener("click",(e)=>{
  if(e.target.id==="memoryModal") e.currentTarget.classList.remove("show");
});

document.getElementById("finalBtn").addEventListener("click",()=>go("final"));
document.getElementById("restartBtn").addEventListener("click",()=>{
  envelope.querySelector(".envelope").classList.remove("open");
  opened=false;
  openLetterBtn.textContent="OPEN MY MESSAGE";
  openLetterBtn.onclick=null;
  go("home");
});

// keyboard convenience
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape") document.getElementById("memoryModal").classList.remove("show");
});
// =========================
// PHOTO ZOOM
// =========================

const photoModal = document.getElementById("photoModal");
const zoomedPhoto = document.getElementById("zoomedPhoto");
const photoModalClose = document.getElementById("photoModalClose");

document.querySelectorAll(".photo-card img").forEach(photo => {

  photo.addEventListener("click", () => {

    zoomedPhoto.src = photo.src;

    photoModal.classList.add("show");

    document.body.style.overflow = "hidden";
  });

});

function closePhoto(){
  photoModal.classList.remove("show");
  document.body.style.overflow = "";
}

photoModalClose.addEventListener("click", closePhoto);

photoModal.addEventListener("click", (e) => {
  if(e.target === photoModal){
    closePhoto();
  }
});

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    closePhoto();
  }
});