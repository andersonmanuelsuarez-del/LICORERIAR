const productos = [
  {
    id: "buchanans-deluxe",
    nombre: "Whisky Deluxe 12 Años BUCHANAN'S",
    imagen: "img/productos/buchanans-12.jpg",
    descripcion: "Buchanans Deluxe es un whisky escocés de gran cuerpo, madurado en roble. Ofrece capas de malta, especias y frutas secas. Recomendado solo, con hielo o con un toque de agua",
    tamanos: [
      { capacidad: "750 ML", precio: 32.00, sku: "5000196003774" },
      { capacidad: "1 Litro", precio: 40.50, sku: "5000196003775" }
    ]
  },
  {
    id: "buchanans-master",
    nombre: "Whisky Master BUCHANAN'S",
    imagen: "img/productos/buchanans-master.jpg",
    descripcion: "Buchanans Master Whisky es un whisky de gran cuerpo, madurado en roble. Ofrece capas de malta, especias y frutas secas. Recomendado solo, con hielo o con un toque de agua",
    tamanos: [
      { capacidad: "750 ML", precio: 36.00, sku: "5000196003776" },
      { capacidad: "1 Litro", precio: 45.00, sku: "5000196003777" }
    ]
  },
  {
    id: "chivas-regal",
    nombre: "Whisky 12 Años (con caja) CHIVAS REGAL",
    imagen: "img/productos/chivas-regal.jpg",
    descripcion: "Chivas Regal es un whisky suave y rico con notas de miel, vainilla y manzana. Ideal para disfrutar en buena compañía.",
    tamanos: [
      { capacidad: "750 ML", precio: 28.00, sku: "5000296003711" },
      { capacidad: "1 Litro", precio: 34.50, sku: "5000296003712" }
    ]
  },
  {
    id: "old-parr",
    nombre: "Whisky 12 Años OLD PARR",
    imagen: "img/productos/old-parr.jpg",
    descripcion: "Old Parr 12 años es un whisky escocés añejado en barricas de roble, de sabor pleno y final cálido, perfecto para paladares exigentes.",
    tamanos: [
      { capacidad: "750 ML", precio: 29.50, sku: "5000396003881" },
      { capacidad: "1 Litro", precio: 33.00, sku: "5000396003882" }
    ]
  },
  {
    id: "jack-daniels-clasico",
    nombre: "Whiskey Old No. 7 JACK DANIEL'S",
    imagen: "img/productos/jack-daniels-clasico.jpg",
    descripcion: "El clásico Tennessee whiskey, filtrado gota a gota a través de carbón de arce para otorgarle su inconfundible suavidad.",
    tamanos: [
      { capacidad: "750 ML", precio: 31.00, sku: "0082184090466" },
      { capacidad: "1 Litro", precio: 33.50, sku: "0082184090467" }
    ]
  },
  {
    id: "jack-daniels-apple",
    nombre: "Whiskey Tennessee Apple JACK DANIEL'S",
    imagen: "img/productos/jack-daniels-apple.jpg",
    descripcion: "Una deliciosa mezcla del clásico Jack Daniel's con un refrescante licor de manzana verde.",
    tamanos: [
      { capacidad: "750 ML", precio: 40.00, sku: "0082184090480" },
      { capacidad: "1 Litro", precio: 44.00, sku: "0082184090481" }
    ]
  },
  {
    id: "jack-daniels-fire",
    nombre: "Whiskey Tennessee Fire JACK DANIEL'S",
    imagen: "img/productos/jack-daniels-fire.jpg",
    descripcion: "Mezcla ardiente de licor de canela roja y el suave carácter de Jack Daniel's.",
    tamanos: [
      { capacidad: "750 ML", precio: 40.00, sku: "0082184090490" },
      { capacidad: "1 Litro", precio: 44.00, sku: "0082184090491" }
    ]
  },
  {
    id: "jack-daniels-honey",
    nombre: "Whiskey Tennessee Honey JACK DANIEL'S",
    imagen: "img/productos/jack-daniels-honey.jpg",
    descripcion: "Un toque de miel natural para un sabor suave y dulce, manteniendo la esencia clásica de Jack.",
    tamanos: [
      { capacidad: "750 ML", precio: 40.00, sku: "0082184090495" },
      { capacidad: "1 Litro", precio: 44.00, sku: "0082184090496" }
    ]
  },
  {
    id: "johnnie-black",
    nombre: "Whisky Black Label JOHNNIE WALKER",
    imagen: "img/productos/johnnie-black.jpg",
    descripcion: "Un ícono, mezcla de whiskies añejados por mínimo 12 años con perfil inconfundiblemente ahumado.",
    tamanos: [
      { capacidad: "750 ML", precio: 27.50, sku: "5000267112211" },
      { capacidad: "1 Litro", precio: 32.00, sku: "5000267112212" }
    ]
  },
  {
    id: "johnnie-double-black",
    nombre: "Whisky Double Black JOHNNIE WALKER",
    imagen: "img/productos/johnnie-double-black.jpg",
    descripcion: "Una versión más intensa, rica y ahumada del icónico Black Label, madurado en barricas de roble tostado.",
    tamanos: [
      { capacidad: "750 ML", precio: 38.00, sku: "5000267112231" },
      { capacidad: "1 Litro", precio: 42.00, sku: "5000267112232" }
    ]
  },
  {
    id: "johnnie-red",
    nombre: "Whisky Red Label JOHNNIE WALKER",
    imagen: "img/productos/johnnie-red.jpg",
    descripcion: "El whisky escocés más vendido del mundo, vibrante y versátil, ideal para mezclar.",
    tamanos: [
      { capacidad: "750 ML", precio: 17.00, sku: "5000267112251" },
      { capacidad: "1 Litro", precio: 23.00, sku: "5000267112252" }
    ]
  },
  {
    id: "something-special",
    nombre: "Whisky SOMETHING SPECIAL",
    imagen: "img/productos/something-special.jpg",
    descripcion: "Un whisky escocés mezclado suave y equilibrado, perfecto para cualquier celebración.",
    tamanos: [
      { capacidad: "750 ML", precio: 16.50, sku: "5000288114411" },
      { capacidad: "1 Litro", precio: 19.00, sku: "5000288114412" }
    ]
  },
  {
    id: "johnnie-gold",
    nombre: "Whisky Gold Label Reserve JOHNNIE WALKER",
    imagen: "img/productos/johnnie-gold.jpg",
    descripcion: "Un blend de lujo, cremoso y con sutiles notas de miel y madera, creado para momentos de celebración.",
    tamanos: [
      { capacidad: "750 ML", precio: 50.00, sku: "5000267112271" }
    ]
  }
];
