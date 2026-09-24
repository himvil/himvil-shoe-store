const products=[
{id:1,name:"Green Suede Low-Top",price:2599,cat:"men",image:"products/green.jpeg",sizes:"EU 40, 41, 42, 43, 44, 45"},
{id:2,name:"Black Gloss Low-Top",price:2599,cat:"men",image:"products/black-side.jpeg",sizes:"EU 40, 41, 42, 43, 44, 45"},
{id:3,name:"Black Gloss Low-Top — Front",price:2599,cat:"men",image:"products/black-front.jpeg",sizes:"EU 40, 41, 42, 43, 44, 45"}];
let cart=JSON.parse(localStorage.getItem("himvilCart")||"[]");
const money=n=>"₹"+n.toLocaleString("en-IN");
function render(){let f=document.getElementById("filter").value;let a=products.filter(p=>f==="all"||f===p.cat||(f==="under3000"&&p.price<3000));document.getElementById("products").innerHTML=a.map(p=>`<article class="product"><div class="pic">${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">` : "PRODUCT IMAGE"}</div><div class="info"><h3>${p.name}</h3><small>${p.cat.toUpperCase()}</small><div class="price">${money(p.price)}</div><small>Sizes: ${p.sizes}</small><br><br><button class="add" onclick="add(${p.id})">ADD TO CART</button></div></article>`).join("")}
function add(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});save();openCart()}
function save(){localStorage.setItem("himvilCart",JSON.stringify(cart));document.getElementById("count").textContent=cart.reduce((s,x)=>s+x.qty,0);show()}
function show(){let el=document.getElementById("items");if(!cart.length){el.innerHTML="<p>Your cart is empty.</p>";document.getElementById("total").textContent="₹0";return}el.innerHTML=cart.map(x=>`<div class="cartitem"><b>${x.name}</b><br>Qty: ${x.qty} × ${money(x.price)} <button class="remove" onclick="removeItem(${x.id})">REMOVE</button></div>`).join("");document.getElementById("total").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0))}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function openCart(){document.getElementById("overlay").classList.add("active");show()}
function closeCart(e){if(!e||e.target.id==="overlay")document.getElementById("overlay").classList.remove("active")}
function checkout(){if(!cart.length)return alert("Your cart is empty.");let total=cart.reduce((s,x)=>s+x.price*x.qty,0);let lines=cart.map(x=>`• ${x.name} | Qty: ${x.qty} | Sizes: ${x.sizes} | ${money(x.price*x.qty)}`).join("\n");let msg=`Hello HIMVIL 👟\n\nI want to place an order:\n\n${lines}\n\nTotal: ${money(total)}\n\nPlease send me the next steps.`;let whatsappNumber="918593868387";window.open("https://wa.me/"+whatsappNumber+"?text="+encodeURIComponent(msg),"_blank")}
render();save();