import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import coffeesConfig from '../coffees/config/coffees.config'

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {

//     return ['buddy brew', 'nescafe']
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]), 
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  providers: [
    CoffeesService,
    // CoffeeBrandsFactory,
    // {
    //   provide: ConfigService,
    //   useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    // },
    // { 
    //   provide: COFFEE_BRANDS, 
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // }
    { 
      provide: COFFEE_BRANDS, 
      useFactory: () => ['buddy brew', 'nescafe'],
      scope: Scope.TRANSIENT,
    }
    // { 
    //   provide: COFFEE_BRANDS, 
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...')
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
    //     console.log('Async factory !!')
    //     return coffeeBrands
    //   },
    //   inject: [Connection]
    // }
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
