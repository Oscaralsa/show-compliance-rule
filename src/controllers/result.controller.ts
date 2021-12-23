import { Request, Response } from "express"

import { getServerlessInfo, login } from "../services/prismaCloud/CWPP"
import { authenticate, getCollection } from "../services/prismaCloud/CSPM";

import { rules } from "../utils/complianceRules"
export async function showResult(req: Request, res: Response) {

  try{
    const authToken = await authenticate()
    let complianceInfo: Array<any> = []
    
    const collectionsResponse = await getCollection(authToken?.data.token)
    const collections: Array<any> = collectionsResponse?.data

    const loginToken = await login()
    const serverlessResponse = await getServerlessInfo(loginToken?.data.token)
    const resumeServerless: Array<any> = serverlessResponse?.data

    resumeServerless.forEach((serverlessFuntion, index) => {
      const collectionsRelated = collections.filter(
        collection => collection.accountIDs.includes(serverlessFuntion.accountID)
      )

      const ruleName = rules.find(rule => rule.name === collectionsRelated[collectionsRelated.length - 1].name)
      let countCompliance: Array<any> = []

      serverlessFuntion.complianceIssues.forEach((compliance: any) => {

        if(countCompliance.find(comp => comp.severity === compliance.severity)){
          let complianceToModify: number = countCompliance.findIndex(comp => comp.severity === compliance.severity)

          countCompliance[complianceToModify] = {
            severity: countCompliance[complianceToModify].severity,
            count: countCompliance[complianceToModify].count + 1
          }
        } else {
          countCompliance[countCompliance.length] = {
            severity: compliance.severity,
            count: 1
          }
        }
      });

      complianceInfo = [...complianceInfo, {
        account: serverlessFuntion.accountID,
        function: serverlessFuntion.name,
        complianceRule: ruleName?.rule,
        countCompliance
      }]
    })

    res.json({
      status: 200,
      data: {
       complianceInfo
      }
    });
  } catch(err) {
    console.log(err, 2)
  }

}
