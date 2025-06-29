function Outfit(condition) {
    const text = condition.toLowerCase();
    if (text.includes('rain')) return 'boots','jacket','umbrella','trousers';
    if (text.includes('cloud')) return 'shoes' , 't-shirt' , 'jacket';
    if (text.includes('clear')) return 'shoes' , 't-shirt' , 'shorts';
    if (text.includes('snow')) return 'snow';
}

function getOutfitIcon(condition) {
    const name = Outfit(condition);
    return {
        static: `/icons/static/${name}.png`,
    };
}