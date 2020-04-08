const NICKEL = 5;
const DIME = 10;
const QUARTER = 25;
const SYMBOL = "¢";

$("form").submit(function(e) {
    const input = $(this).serializeArray();
    const dollars = parseFloat(input[0].value);
    const cents = Math.round(dollars * 100);
    let remainder = cents;
    
    const quarters = getAmountCoins(remainder, QUARTER);
    remainder %= QUARTER;
    const dimes = getAmountCoins(remainder, DIME);
    remainder %= DIME;
    const nickels = getAmountCoins(remainder, NICKEL);
    remainder %= NICKEL;
    const pennies = remainder;
    
    updateLayout("cent", cents, quarters + dimes + nickels + pennies);
    updateLayout("quarter", quarters * QUARTER, quarters);
    updateLayout("dime", dimes * DIME, dimes);
    updateLayout("nickel", nickels * NICKEL, nickels)
    updateLayout("penny", pennies, pennies);

    $('form :input').val('');
    e.preventDefault();
});

function updateLayout(name, total, amount) {
    $("." + name + " > .total").html(total + SYMBOL);
    $("." + name + " > .amount").html(amount + " coins");
}

function getAmountCoins(remainder, coinType) {
    return Math.floor(remainder / coinType);
}