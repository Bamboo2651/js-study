class Dog extends Animal{
    constructor(name, age, breed) {
        super(name, age);
        this.breed = breed;
    }

    bark() {
        return `${this.name}:ワン`
    }
}