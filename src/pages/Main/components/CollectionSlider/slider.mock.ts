// collections.mock.ts

import { mockHttp } from '../../../../shared/http.ts';

export const mockCollections = [
  {
    id: 1,
    imageUrl: 'https://s3-alpha-sig.figma.com/img/4686/bf5e/f2a45c4e3139e3e567d794d890d8d556?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cp5SnMHBI-wdXrlaaN3fXqIxV3uwGc~XSgMqwSEQr5LLaGGEB-Vry-mEgioWbjdt7fWVefxA3s-5KnMJTHTfVnB5Cz8SOJZY9GYgzDVs9So16XASmuCBdK6MWAUsHmiXkRwRbDjjMCU4sygHgeUI3ZyRmaKpGKXvaol8hP8xwgL1FliomaTi54Av2q2RayVkNLAwXDaR3VJtj-gGRy~1H~IygCieHAMB4idGmZtq~aZvj03lj15-6A0VUBernv4CfmxZRn8NJWDM4tL9QB8qavx8FbNkWyPOjIZ-TEHfXZMg3mMiew-Xe5ylBxH-XNIejizaZYf23s1BA2959w7dLw__',
    title: 'public! рекомендует',
  },
];

// mockHttp.onGet('/api/collections').reply(200, mockCollections);
