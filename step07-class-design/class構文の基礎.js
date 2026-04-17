class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `私は${this.name}、${this.age}歳です`;
    }

}

const dog = new Animal(`ポチ`, 3);
dog.greet();