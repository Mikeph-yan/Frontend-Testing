document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://api.csdi.gov.hk/apim/dataquery/api/?id=edb_rcd_1629267205213_58940&layer=asfps&limit=10&offset=0');
        const data = await response.json();

        const cards = document.querySelectorAll('.qualification-card');

        data.features.forEach((feature, index) => {
            if (index < cards.length) {
                const properties = feature.properties;

                const facilityNameElement = cards[index].querySelector('.title h3');
                if (facilityNameElement) {
                    facilityNameElement.textContent = properties.Facility_Name || 'Facility Name';
                }

                const facilityaddressNameElement = cards[index].querySelector('.address');
                if (facilityaddressNameElement) {
                    facilityaddressNameElement.textContent = properties.Address || 'Address Text Here';
                }

                const lastUpdatedDate = properties.Last_Updated_Date___最後更新日期;
                if (lastUpdatedDate) {
                    const date = new Date(lastUpdatedDate);
                    const formattedDate = date.toISOString().split('T')[0];
                    const updatedDateElement = cards[index].querySelector('.updated-date .date');
                    if (updatedDateElement) {
                        updatedDateElement.textContent = formattedDate;
                    }
                    const iconTextDateElement = cards[index].querySelector('.icon-text-block .content .date');
                    if (iconTextDateElement) {
                        iconTextDateElement.textContent = formattedDate;
                    }
                }

                const datasetElement = cards[index].querySelector('.cat');
                if (datasetElement) {
                    datasetElement.textContent = properties.數據集 || 'Higher Education Institutions';
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
