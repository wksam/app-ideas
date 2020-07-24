function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(value);
}