const
    path = require('path'),
    { Buyer, CashbackType } = require(path.join(__dirname, "..", "models"));


function getCashBack(cashBack, type) {
    switch (type) {
        case CashbackType.EARNED:
        case CashbackType.REFUND:
            return cashBack;
        case CashbackType.SPENT:
            return -1 * cashBack;
        default:
            throw new Error('Undefined cashback type: ' + type);
    }
}
    

async function getAvailableCashback(buyerId){
        let buyer = await Buyer.findById(buyerId);
        return getAvailableCashbackByBuyer(buyer);
}

function getAvailableCashbackByBuyer(buyer){
    return buyer.cashBack.reduce((a, e) => a + getCashBack(e.cashBack, e.type), 0);
}
function refundCashback(buyer, orderId, amount){
    buyer.cashBack.push({
        cashBack: amount,
        orderId: orderId,
        type: CashbackType.REFUND
    });
    return buyer;
}
function earnCashback(buyer, orderId, amount){
    buyer.cashBack.push({
        cashBack: amount,
        orderId: orderId,
        type: CashbackType.EARNED
    });
    return buyer;
}
function spendCashback(buyer, orderId, amount){
    let availableCashback = getAvailableCashbackByBuyer(buyer);
    if(availableCashback < amount){
        throw new Error('Insufficient cashback');
    }
    buyer.cashBack.push({
        cashBack: amount,
        orderId: orderId,
        type: CashbackType.SPENT
    });
    return buyer;
}
module.exports ={
    getAvailableCashback,
    getAvailableCashbackByBuyer,
    spendCashback,
    refundCashback,
    earnCashback
};