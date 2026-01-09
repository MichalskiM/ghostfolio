import { ConfigurationModule } from '@ghostfolio/api/services/configuration/configuration.module';
import { CryptocurrencyModule } from '@ghostfolio/api/services/cryptocurrency/cryptocurrency.module';
import { OpenFigiDataEnhancerService } from '@ghostfolio/api/services/data-provider/data-enhancer/openfigi/openfigi.service';
import { TrackinsightDataEnhancerService } from '@ghostfolio/api/services/data-provider/data-enhancer/trackinsight/trackinsight.service';
import { TrackinsightMirrorDataEnhancerService } from '@ghostfolio/api/services/data-provider/data-enhancer/trackinsightlocal/trackinsightmirror.service';
import { YahooFinanceDataEnhancerService } from '@ghostfolio/api/services/data-provider/data-enhancer/yahoo-finance/yahoo-finance.service';

import { Module } from '@nestjs/common';

import { DataEnhancerService } from './data-enhancer.service';

@Module({
  exports: [
    DataEnhancerService,
    OpenFigiDataEnhancerService,
    TrackinsightDataEnhancerService,
    TrackinsightMirrorDataEnhancerService,
    YahooFinanceDataEnhancerService,
    'DataEnhancers'
  ],
  imports: [ConfigurationModule, CryptocurrencyModule],
  providers: [
    DataEnhancerService,
    OpenFigiDataEnhancerService,
    TrackinsightDataEnhancerService,
    TrackinsightMirrorDataEnhancerService,
    YahooFinanceDataEnhancerService,
    {
      inject: [
        OpenFigiDataEnhancerService,
        TrackinsightDataEnhancerService,
        TrackinsightMirrorDataEnhancerService,
        YahooFinanceDataEnhancerService
      ],
      provide: 'DataEnhancers',
      useFactory: (
        openfigi,
        trackinsight,
        trackinsightmirror,
        yahooFinance
      ) => [openfigi, trackinsight, trackinsightmirror, yahooFinance]
    }
  ]
})
export class DataEnhancerModule {}
