var configurationService = require('./configurationService');

var azureStorage = require('azure-storage');
var azureStorageTableService = azureStorage.createTableService(configurationService.storage.accountName, configurationService.storage.accountKey);

var service = {};

service.tableNames = {
    gabRegistration: 'GABRegistration'
};

service.createTableIfNotExists = function(tableName, callback) {
    azureStorageTableService.createTableIfNotExists(tableName, callback);
};

service.insertTableEntity = function(tableName, tableEntity, callback) {
    azureStorageTableService.insertEntity(tableName, tableEntity, callback);
};

service.replaceTableEntity = function(tableName, tableEntity, callback) {
    azureStorageTableService.replaceEntity(tableName, tableEntity, callback);
};

service.getTableEntities = function(tableName, partitionKey, rowKey, customFilter, callback) {
    var combinedFilterProperties = customFilter || {};

    if (!!partitionKey) {
        combinedFilterProperties.PartitionKey = partitionKey;
    }

    if (!!rowKey) {
        combinedFilterProperties.RowKey = rowKey;
    }

    var query;

    if (Object.keys(combinedFilterProperties).length > 0) {
        var combinedFilterQuery = null;

        for (var property in combinedFilterProperties) {
            var filter = azureStorage.TableQuery.stringFilter(property, azureStorage.TableUtilities.QueryComparisons.EQUAL, combinedFilterProperties[property]);
            if (combinedFilterQuery === null) {
                combinedFilterQuery = filter;
            } else {
                combinedFilterQuery = azureStorage.TableQuery.combineFilters(combinedFilterQuery, azureStorage.TableUtilities.TableOperators.AND, filter);
            }
        }

        query = new azureStorage.TableQuery().where(combinedFilterQuery);
    } else {
        query = new azureStorage.TableQuery();
    }

    azureStorageTableService.queryEntities(tableName, query, null, function(error, results){
        callback(error, results);
    });
};

module.exports = service;