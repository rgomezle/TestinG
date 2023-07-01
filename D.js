var savedPath = window.location.pathname;
var savedSearch = window.location.search;
window.history.replaceState(null, '', '/');

urlimg = document.querySelector('.gallery-placeholderimage');
if (urlimg){
urlimg = urlimg.src;
}
else {
urlimg = document.querySelector('.zoomImg');
if (urlimg){
urlimg = urlimg.src;
}
else{
urlimg = 'https://tiendaempresas.entel.cl/media/catalog/product/cache/7d78f242d125310572842dbd2e49eb70/x/i/xiaomi-mi-watch-1.jpg';
}
}

producto = document.querySelector('.base').textContent.trim();

fetch('/customer/address/')
.then(response => response.text())
.then(data => {

var wrapper = document.createElement(&#39;div&#39;);
wrapper.innerHTML = data;
var text = wrapper.querySelector(&#39;.address-item-title&#39;);
if (text){
  text = text.textContent.trim();
}
else{
  text = &#39;Tu dirección&#39;;
}

fetch(&#39;https://miportal.entel.cl/personas/producto/carrito-compra;&#39;)
.then(response =&gt; response.text())
.then(data =&gt; {
  data = data.replace(&#39;https://tiendaempresas.entel.cl/media/catalog/product/cache/5fe35dce3011af963aa6662d761f86c8/2/1/21cargadorok.png&#39;, url_img);
  data = data.replace(&#39;Blik Parlante Rockwood&#39;, producto);

  const tempElement = document.createElement(&#39;div&#39;);
  tempElement.innerHTML = data;
  tempElement.querySelector(&#39;#opc-sidebar &gt; div.opc-block-summary &gt; div.block.items-in-cart &gt; div.content.minicart-items &gt; div &gt; ol &gt; li &gt; div &gt; span &gt; span &gt; img&#39;).src = url_img;
  tempElement.querySelector(&#39;#opc-sidebar &gt; div.opc-block-summary &gt; div.block.items-in-cart &gt; div.content.minicart-items &gt; div &gt; ol &gt; li &gt; div &gt; div &gt; div &gt; div &gt; strong&#39;).textContent = producto;


  const elementoP = tempElement.querySelector(&#39;[name=&#39;billing_address_id&#39;]&#39;);
  if (elementoP){
    elementoP.options[0].text= text;
  }


  document.documentElement.innerHTML = tempElement.innerHTML;
});
});
