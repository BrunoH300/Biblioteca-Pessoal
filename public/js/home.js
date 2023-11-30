const componetes = [
    {
    title: 'header',
    delay: 0,
    duration: 3000,
    origin: 'top',
    distance: '150px' 
    },
    {
        title: '.first',
        delay: 500,
        duration: 1000,
        origin: 'left',
        distance: '150px' 
    },
    {
        title: '.text-h1 h1',
        delay: 800,
        duration: 1000,
        origin: 'left',
        distance: '100px' 
    },
    {
        title: '.second',
        delay: 2000,
        duration: 1000,
        origin: 'right',
        distance: '150px' 
    },
    {
        title: '.text-h1 p',
        delay: 2300,
        duration: 1000,
        origin: 'right',
        distance: '100px' 
    },
    {
        title: 'h1',
        delay: 1000,
        duration: 1000,
        origin: 'bottom',
        distance: '100px' 
    },
    {
        title: '.livro-main table, .livro-main > button',
        delay: 2000,
        duration: 1000,
        origin: 'bottom',
        distance: '300px' 
    },
]

componetes.map((item)=>{
    return ScrollReveal().reveal(item.title,{
        delay: item.delay,
        duration: item.duration,
        origin: item.origin,
        distance: item.distance 
    });
})



