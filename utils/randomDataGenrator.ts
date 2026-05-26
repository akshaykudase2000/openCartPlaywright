import {faker} from '@faker-js/faker';

export class RandomDataUtils
{
    static getFirstName()
    {
        return faker.person.firstName();
    }

    static getLastName()
    {
        return faker.person.lastName();
    }
    static getFullName()
    {
        return faker.person.fullName();
    }
    static getEmail()
    {
        return faker.internet.email();
    }
    static getPhoneNumber()
    {
        return faker.phone.number();
    }
    static getUserName():string
    {
        return faker.internet.username();
    }
    static getPassword():string
    {
        return faker.internet.password();
    }

    static getRandomCountry():string
   {
    return faker.location.country();
   }

   static getRandomeState():string
   {
    return faker.location.state();
   }

   static getRandomeCity():string
   {
    return faker.location.city();
   }

   static getRandomepin():string
   {
    return faker.location.zipCode();
   }
   static getRandomAddress(): string {
    return faker.location.streetAddress();
  }
  
  static getRandomPassword(length: number = 10): string {
    return faker.internet.password({ length });
  }

  static getRandomAlphanumeric(length: number): string {
    return faker.string.alphanumeric(length);
  }

  static getRandomNumeric(length: number): string {
    return faker.string.numeric(length);
  }

  static getRandomUUID(): string {
    return faker.string.uuid();
  }
}