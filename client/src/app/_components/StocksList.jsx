import React, { useEffect, useState } from "react";
import { List, Skeleton } from "antd";
const StocksList = ({ stocks }) => {
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    setInitLoading(false);
  }, []);

  return (
    <div className="h-96 overflow-y-auto p-1 border">
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={stocks}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={
                  <a href="#" className="text-sm">
                    {item}
                  </a>
                }
                description="NSE EQ"
              />
              <div className="flex flex-col justify-end">
                <div className="text-right">435.65</div>
                <div className="text-right text-sm text-slate-400">
                  +3.15 (0.39%)
                </div>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StocksList;
