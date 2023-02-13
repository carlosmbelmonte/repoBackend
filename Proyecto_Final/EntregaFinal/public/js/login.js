window.addEventListener("load", function(event) {
    document.getElementById('chatGeneral').style.display = 'none'   
})

document.getElementById("showConfServer")?.addEventListener("click", () => {
    document.getElementById('loginPrevio').style.display = 'none'         
    document.getElementById('servidorset').style.display = ''  
    document.getElementById('chatGeneral').style.display = 'none'
    document.getElementById('loginerror').style.display = 'none'
    document.getElementById('registro').style.display = 'none'
    document.getElementById('registroerror').style.display = 'none'
})

document.getElementById("showLogReg")?.addEventListener("click", () => {
    document.getElementById('loginPrevio').style.display = ''                
    document.getElementById('servidorset').style.display = 'none'
    document.getElementById('chatGeneral').style.display = 'none'
    document.getElementById('loginerror').style.display = 'none'
    document.getElementById('registro').style.display = 'none'
    document.getElementById('registroerror').style.display = 'none'
})

document.getElementById("showChat")?.addEventListener("click", () => {
    document.getElementById('loginPrevio').style.display = 'none'        
    document.getElementById('servidorset').style.display = 'none'
    document.getElementById('chatGeneral').style.display = ''
    document.getElementById('loginerror').style.display = 'none'
    document.getElementById('registro').style.display = 'none'
    document.getElementById('registroerror').style.display = 'none'
})

