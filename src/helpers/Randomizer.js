export default class Randomizer{

    static int (digitNums) {
        const multiplier = digitNums ? Math.pow(10,digitNums) : 100000;
        return Math.round(Math.random()*multiplier);
    }
    
}