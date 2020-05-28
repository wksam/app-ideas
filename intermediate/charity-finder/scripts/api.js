class GlobalGivingAPI {
    constructor() {
        if(!GlobalGivingAPI.instance) {
            GlobalGivingAPI.instance = this;

            this._domain = 'https://api.globalgiving.org';
            this._organizations = [1]
            this._paths = {
                organizations: '/api/public/orgservice/all/organizations/active'
            }
            this._hasNext = false;
            this._nextOrgId = -1;
        }
        return GlobalGivingAPI.instance;
    }

    set apikey(apikey) { this._apikey = apikey; }
    get apikey() { return this._apikey; }

    set hasNext(hasNext) { this._hasNext = hasNext; }
    get hasNext() { return this._hasNext; }

    get hasPrevious() { return this._organizations.length > 1; }

    getOrganizations(nextOrgId = 1) {
        const params = '?api_key=' + this._apikey + '&nextOrgId=' + nextOrgId;
        const url = this._domain + this._paths.organizations + params;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            this.hasNext = data.organizations.hasNext;
            if(this.hasNext) this._nextOrgId = data.organizations.nextOrgId;
            updatePagination();
            fillOrganizations(data.organizations.organization);
        });
    }

    addOrganization(id) {
        this._organizations.push(id);
    }

    getNextId() {
        return this._nextOrgId;
    }

    getPreviousId() {
        if(this._organizations.length > 1)
            this._organizations = this._organizations.slice(0, this._organizations.length - 1);
        return this._organizations[this._organizations - 1];
    }
    

}

const api = new GlobalGivingAPI();