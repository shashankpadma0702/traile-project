import { useEffect, useState } from 'react';
import { getRewards, redeemReward } from '../api/reward';

export default function Rewards() {
  const [points, setPoints] = useState(0);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadRewards() {
      try {
        const data = await getRewards();
        setPoints(data.points);
        setOffers(data.availableRewards);
      } catch (err) {
        alert('Failed to load rewards: ' + err.message);
      }
    }
    loadRewards();
  }, []);

  const handleRedeem = async (id) => {
    try {
      await redeemReward(id);
      alert('Redeemed successfully!');
    } catch (err) {
      alert('Redemption failed: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Reward Points</h2>
      <p className="mb-6">Points Available: <strong>{points}</strong></p>

      <h3 className="text-xl font-semibold mb-3">Redeemable Offers</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.id} className="p-4 bg-white shadow rounded">
            <h4 className="font-bold text-lg mb-2">{offer.name}</h4>
            <p className="mb-2">{offer.description}</p>
            <p className="text-sm text-gray-600 mb-2">Cost: {offer.cost} pts</p>
            <button
              className="bg-blue-600 text-white py-1 px-3 rounded"
              onClick={() => handleRedeem(offer.id)}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
